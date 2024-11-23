// submit.js

import { useState } from "react";
import { toast } from "react-toastify";
import { useStore } from "reactflow";
import { SERVER_URL } from "./constants";

export const SubmitButton = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { edges } = useStore((store) => ({
    edges: store.edges,
  }));
  const nodes = useStore().getNodes();

  const submitPipeline = async () => {
    setIsSubmitting(true);
    await filterAndValidate({ edges, nodes }, validatePipeline);
    setIsSubmitting(false);
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "fixed",
        bottom: "30px",
        width: "100%",
        zIndex: "40",
      }}
    >
      <button
        className="nodrag bg-node-primary rounded-md w-16 py-1 cursor-pointer text-white"
        type="submit"
        onClick={submitPipeline}
      >
        {isSubmitting ? (
          <span className="inline-block animate-spin">
            <i className="fa-solid fa-spinner"></i>
          </span>
        ) : (
          "Submit"
        )}
      </button>
    </div>
  );
};

const filterAndValidate = async (pipeline, validatorFunction) => {
  // Getting all the source and destinatio of edges
  const edges = pipeline.edges.map((edge) => {
    return {
      source: edge.source,
      destination: edge.target,
    };
  });
  // Getting all the nodes
  const nodes = pipeline.nodes.map((node) => node.id);

  // Validating the pipeline
  await validatorFunction({ edges, nodes });
};

const validatePipeline = async (edges) => {
  try {
    const rawRes = await fetch(SERVER_URL+"/pipelines/parse", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(edges),
    });
    if (!rawRes.ok) {
      const res = await rawRes.json();
      toast.error(`Error: ${res.message}`);
    } else {
      const res = await rawRes.json();
      if (res.is_dag) {
        toast.success(`Success :)`);
        toast.info(
          `The graph is acyclic. Number of nodes: ${res.num_nodes}, number of edges: ${res.num_edges}`
        );
      } else
        toast.warn(
          `The graph has cycle! Number of nodes: ${res.num_nodes}, number of edges: ${res.num_edges}`
        );
      return res;
    }
  } catch (e) {
    toast.error("Error: Something went wrong.");
  }
};
