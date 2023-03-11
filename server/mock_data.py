from typing import List
from models.job import Job
from models.study import Study
from models.section import Section
from api.user_data import UserDataResponse

jobs: List[Job] = [
    Job('RebelDot Solutions', 'Frontend Developer', 'Worked as frontend developer on various tasks and projects regarding bulk upload flow', '2015-10-10', '2016-05-20'),
    Job('RebelDot Solutions', 'Backend Developer', 'Worked as backend developer on optimizing the process of bulk upload flow' , '2016-10-13', '2017-12-13'),
    Job('Endava', 'Arhitect Designer', 'Prepared a new team of designers and teached them various things', '2018-01-15', '2018-03-20'),
    Job('TakeOff Labs', 'Team Manager', 'Managed a whole team of developers in the processs of making the best airport application on the planet', '2019-12-12', '2023-02-14'),
]
studies: List[Study] = [
    Study('Mihai Viteazu High School', 'High School Student', '2016-09-15', '2020-06-24'),
    Study('Babes Bolyai University', 'Bachelors Degree CS', '2020-10-01', '2023-06-28'),
    Study('Babes Bolyai University', 'Masters Degree DB', '2023-09-10', '2025-06-20')
]
otherSections: List[Section] = [
    Section('Volunteer at Crucea Rosie', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquam vestibulum morbi blandit cursus risus at. Risus pretium quam vulputate dignissim. Justo eget magna fermentum iaculis eu non diam phasellus. Imperdiet sed euismod nisi porta lorem mollis aliquam. Pretium lectus quam id leo in vitae turpis massa.'),
    Section('Volunteer at Cariere in IT', 'Aliquam purus sit amet luctus venenatis. Elementum facilisis leo vel fringilla est ullamcorper. Tincidunt eget nullam non nisi est. Mollis aliquam ut porttitor leo a diam sollicitudin. Fringilla est ullamcorper eget nulla facilisi etiam dignissim diam.'),
]
skills: List[str] = ['C++', 'Java', 'Figma', 'OOP', 'DB', 'React', 'Flask', 'Design Patterns', 'Communication', 'Advanced Math', 'Typescript']

parsedUserData: UserDataResponse = UserDataResponse(jobs, studies, otherSections, skills)