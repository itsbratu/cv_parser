from typing import Optional
from models.company import Company
from models.optional import optional_str

optional_company = Optional[Company]

class Job:
    position: optional_str
    company: optional_company
    applyUrl: optional_str
    
    def __init__(self, position: optional_str, company: optional_company, applyUrl: optional_str) -> None:
        self.position = position
        self.company = company
        self.applyUrl = applyUrl
    
    def __str__(self) -> str:
        return self
