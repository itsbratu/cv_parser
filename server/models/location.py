from models.optional import optional_str

class Location:
    country: optional_str
    city: optional_str
    line1:optional_str
    line2: optional_str
    
    def __init__(self, country: optional_str, city: optional_str, line1: optional_str, line2: optional_str) -> None:
        self.country = country
        self.city = city
        self.line1 = line1
        self.line2 = line2
