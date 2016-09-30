#!/usr/bin/env python
#
# Copyright 2007 Google Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#
import os

import jinja2
import webapp2

from google.appengine.ext import db

template_dir = os.path.join(os.path.dirname(__file__), 'templates')
jinja_env = jinja2.Environment(loader = jinja2.FileSystemLoader(template_dir),
								autoescape = True)



class Handler(webapp2.RequestHandler):
	def write(self, *a, **kw):
		self.response.out.write(*a, **kw)

	def render_str(self, template, **params):
		t = jinja_env.get_template(template)
		return t.render(params)

	def render(self, template, **kw):
		self.write(self.render_str(template, **kw))


#*****************************************************************************************************
#upto this point, everything stays the same.
#the code above sets up jinja. this is to be included in all applications in the exact same way.
#for each application, create a templates folder and save all your html files in there.
class Player(db.Model):
	playername=db.TextProperty()
	playerscore=db.IntegerProperty()

class ListSurveys(Handler):
	def get(self):
		players = db.GqlQuery("SELECT * FROM Player "
							  "ORDER BY playerscore DESC ")
		self.render("players.html", players=players)

class MainPage(Handler):		
	def get(self):
		self.render("base.html")

	def post(self):
		name=self.request.get("name")
		if(name==""):
			playername="Anonymous"
		else:
			playername=name

		score=self.request.get("score")
		playerscore=int(score)
		s = Player(playername=playername, playerscore=playerscore)
		s.put()
		self.render("base.html")

class ReminderTool(Handler):		
	def get(self):
		self.render("ReminderApp.html")



app = webapp2.WSGIApplication([
    ('/', MainPage),('/players', ListSurveys),('/remindertool', ReminderTool),
], debug=True)


