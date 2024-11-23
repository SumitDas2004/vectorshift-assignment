from fastapi import FastAPI, Form
from PipelineRequestModel import PipelineRequestModel
from typing import Dict, List
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')
def parse_pipeline(pipeline: PipelineRequestModel):
    adj = convert_to_adjacency_list(pipeline=pipeline)

    return {
        "num_nodes": get_number_of_nodes(pipeline=pipeline),
        "num_edges": get_number_of_edges(pipeline=pipeline),
        "is_dag": is_dag(adj)
    }



def is_dag(adj: Dict[str, List[str]]) -> bool:
    visited = set()
    for node in adj.keys():
        if node not in visited and not __is_dag(node=node, adj=adj, visited=visited, curVisited=set()):
            return False
    return True

def __is_dag(node: str, adj:Dict[str, List[str]], curVisited:set, visited: set)->bool:
    curVisited.add(node)
    visited.add(node)
    for neigh in adj.get(node):
        if neigh in curVisited:
            return False
        if neigh not in visited and not __is_dag(neigh, adj, curVisited, visited):
            return False

    curVisited.remove(node)
    return True


def convert_to_adjacency_list(pipeline: PipelineRequestModel):
    adj = {}
    for node in pipeline.nodes:
        adj[node] = []

    for edge in pipeline.edges:
        adj[edge.source].append(edge.destination)
    
    return adj

def get_number_of_nodes(pipeline:PipelineRequestModel) -> int:
    return len(pipeline.nodes)

def get_number_of_edges(pipeline:PipelineRequestModel) -> int:
    return len(pipeline.edges)