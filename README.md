# ImpactChat
ImpactChat is an experimental chatting software that is currently in the works!


## Contributing Instructions
> These instructions are currently written for linux
### Building Frontend
`cd frontend/impactchat/`  
`npm run build`  

### Running Backend
Navigate to folder  
`cd backend`  
Update PIP  
`python3 -m pip install --user --upgrade pip`  
Create Virtual Environment  
`python3 -m pip install --user virtualenv`  
`python3 -m venv venv`  
Set Up Virtual Environment  
`source venv/bin/activate`  
`pip3 install -r requirements.txt`  
Run Server  
`python3 main.py`  
When Finished, Exit Venv  
`deactivate`  