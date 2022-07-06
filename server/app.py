import os
from urllib import response
from flask import (
     Flask,
     request,
     jsonify,

)
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from sqlalchemy.sql import func
import urllib.request
from urllib.parse import urlparse,urljoin
from bs4 import BeautifulSoup
import requests,validators,json,uuid,pathlib

basedir = os.path.abspath(os.path.dirname(__file__))

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'database.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
migrate = Migrate(app, db)

class Story(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    author = db.Column(db.String(100), nullable=False)
    desc = db.Column(db.String(100), nullable=False)
    url = db.Column(db.String(100), nullable=False)
    tags = db.Column(db.String(300), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())

    def __init__(self,title,author,desc, url, tags):
        self.title = title
        self.author = author
        self.desc = desc
        self.url = url
        self.tags = tags

    def __repr__(self):
        return f'<Story {self.title}>'
    
def story_serializer(story):
    return{
         "title":story.title,
         "author":story.author,
         "desc":story.desc,
         "url" : story.url,
         "tags": story.tags
    }
 
    
@app.route('/home',methods=['GET', 'POST'], strict_slashes=False)
def index():
   return jsonify([*map(story_serializer, Story.query.all())])

@app.route('/test',methods=['POST'])
def process_form():
    data = request.data
    return data
    
@app.route('/create',methods=['POST'], strict_slashes=False)
def story_data():
    if request.method == 'POST':
        data = request.data
        def format_url():
            url = str(data, 'UTF-8')
            newurl = url.replace('"','')
            return newurl
        story_url = format_url()
        source = requests.get(format_url()).text
        soup = BeautifulSoup(source, 'html.parser')
        def find_title():
            data = soup.findAll('h2', attrs={'class':'title'})
            str = ''
            for title in data:
                str += title.text
            clean_str = str.replace('\n','')
            return clean_str.strip()
        story_title = find_title()
        def find_auth():
            data = soup.findAll('a', attrs={'rel': 'author'})
            for auth in data:
                return auth.text
        story_auth = find_auth()
        def find_desc():
            data = soup.blockquote.contents
            desc = ''
            for dis in data:
                desc += dis.text
            clean_str = desc.replace('\\n',',')
            return clean_str
        story_desc = find_desc()
        def find_tags():
            data = soup.findAll('a', attrs={'class': 'tag'})
            mylist = []
            for tag in data:
             mylist.append(tag.text)
            str_tags = ','.join(map(str, mylist))
            return str_tags
        story_tags = find_tags()
        try:
            title = find_title()
            author = find_auth()
            desc = find_desc()
            url = format_url()
            tags = find_tags()
            story = Story(title,author,desc,url, tags)
            db.session.add(story)
            db.session.commit()
            response_body = {
             "title": story_title,
             "author": story_auth,
             "desc": story_desc,
             "url": story_url,
             "tags": story_tags
            }
            
            return response_body
        except Exception as e:
            return ({'error': e})
            
   