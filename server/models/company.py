from typing import Optional
from models.location import Location
from models.optional import optional_str, optional_list_str

optional_location = Optional[Location]

class Company:
    name: optional_str
    desciption: optional_str
    specialities: optional_list_str
    tagLine: optional_str
    phoneNumber: optional_str
    headquarter: optional_location
    companyUrl: optional_str
    
    def __init__(self, name: optional_str, description: optional_str, specialities: optional_list_str, tagLine: optional_str, phoneNumber: optional_str, headquarter: optional_location, companyUrl: optional_str) -> None:
        self.name = name
        self.desciption = description
        self.specialities = specialities
        self.tagLine = tagLine
        self.phoneNumber = phoneNumber
        self.headquarter = headquarter
        self.companyUrl = companyUrl
    
    def __str__(self) -> str:
        return self
    