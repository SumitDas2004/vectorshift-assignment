from pydantic import BaseModel
from typing import List


class Edge(BaseModel):
    source: str
    destination: str
    
class PipelineRequestModel(BaseModel):
    edges: List[Edge]
    nodes: List[str]