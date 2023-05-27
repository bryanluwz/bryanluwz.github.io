# This Python file is for compiling / managing the news json file
import os
import json

class NewsJSONFormatter:
	# User has to provide the path to the news folder and the json file as the output
	def __init__(self) -> None:
		self.json_file = None
		self.json_file_path = None

		self.news_folder_path = None
		self.news_markdown_paths = []

	# This function is for setting the news folder path
	def set_news_folder_path(self, news_folder_path: str) -> None:
		self.news_folder_path = news_folder_path

	# This function is for setting the json file path
	def set_json_file_path(self, json_file_path: str) -> None:
		self.json_file_path = json_file_path

	# This function is for loading all the markdown file from the news folder, and store the full path in a list
	def load_news_folder(self) -> None:
		if self.news_folder_path is None:
			raise Exception("News folder path is not provided")
		
		self.news_markdown_paths.clear()
		self.news_markdown_paths = os.listdir(self.news_folder_path)
		self.news_markdown_paths = [os.path.join(self.news_folder_path, news_markdown_path) for news_markdown_path in self.news_markdown_paths if news_markdown_path.endswith('.md')]

	# This function is to parse all the markdown file
	def parse_news_markdown(self):
		if self.news_folder_path is None:
			raise Exception("News folder path is not provided")
		
		if len(self.news_markdown_paths) == 0:
			self.load_news_folder()

		json = {}

		for news_markdown_path in self.news_markdown_paths:
			try:
				key, value = self.news_markdown_to_json(news_markdown_path)
				json[key] = value
			except Exception as e:
				print(e)
				print("Skipping this file")

		return json

	# This function is for reading the markdown file content, and formatting it into json
	# The markdown file should be in the following format:
	# ---
	# # <Title> -- This is the header and would be the title of the news, and formatted as the key of the json, while the key is an object
	# and the following line would be formatted as one of the object value of the json as the subtitle
	# optional whitespace
	# ## Image -- This is the image of the news, and the following line would be formatted as one of the object value of the json
	# optional whitespace
	# ## Title -- This is the title of the news, and the following line would be formatted as one of the object value of the json, if no ## Title then ignore this
	# optional whitespace
	# ## Body -- This is the body of the news, and the following line would be formatted as one of the object value of the json, with one line break, and the following lines would all be considered as the body, until the next ## is found
	# optional whitespace
	# ## Date -- This is the date (last updated date) of the news, and the following line would be formatted as one of the object value of the json
	# optional whitespace
	def news_markdown_to_json(self, markdownFile):
		with open(markdownFile, 'r', encoding='utf-8') as f:
			lines = f.readlines()
			# lines = [line.strip() for line in lines if line.strip() != '']

		json  = {}

		# Find the title, which is the first line that starts with '#'
		title = None
		for line in lines:
			if line.startswith('#'):
				title = line.strip('#').strip()
				break

		if (title is None):
			raise Exception(f"[-] Title for {markdownFile} is not found")
		
		# Find the subtitle, which is the one line that starts after the title, ignoring whitespace
		subtitle = None

		index = lines.index("# " + title + "\n")

		for line in lines[index + 1:]:
			if line.strip() != '':
				subtitle = line.strip()
				break

		if (subtitle is None):
			raise Exception(f"[-] Subtitle for {markdownFile} is not found")
		
		json["contentSubtitle"] = subtitle

		# Find the image source, which is the one line that starts after '## Image', ignoring whitespace, unless there is no '## Image'
		image = None

		for line in lines:
			if line.startswith('## Image'):
				for nextLine in lines[lines.index(line) + 1:]:
					if nextLine.strip() != '':
						image = nextLine.strip()
						break

		if (image is None):
			print(f"[!] Image for {markdownFile} is not found")
		else:
			json["imgSrc"] = image

		# Find the title, which is the one line that starts after '## Title', ignoring whitespace, unless there is no '## Title'
		contentTitle = None
		for line in lines:
			if line.startswith('## Title'):
				for nextLine in lines[lines.index(line) + 1:]:
					if nextLine.strip() != '':
						contentTitle = nextLine.strip()
						break
		
		if (contentTitle is None):
			# Just a warning is fine
			print(f"[!] Content title {markdownFile} is not found")
		else:
			json["contentTitle"] = contentTitle

		# Find the body, which is the lines that start after '## Body', ignoring initial and trailing whitespace, until the next '##' is found
		body = None
		for line in lines:
			if line.startswith('## Body'):
				body = ''
				for nextLine in lines[lines.index(line) + 1:]:
					if nextLine.startswith('##'):
						break
					else:
						body += nextLine

		if (body is None):
			raise Exception(f"[-] Body for {markdownFile} is not found")
		
		json["contentBody"] = body
		
		# Find the date, which is the one line that starts after '## Date', ignoring whitespace
		date = None
		for line in lines:
			if line.startswith('## Date'):
				for nextLine in lines[lines.index(line) + 1:]:
					if nextLine.strip() != '':
						date = nextLine.strip()
						break
		
		if (date is None):
			print(f"[-] Date for {markdownFile} is not found")
		else:
			json["lastUpdatedDate"] = date
		
		# Return the key, object tuple
		return (title, json)
	
	# This function will read the contents of the json file as a variable, and update the json with the new json
	def update_json(self):
		if self.json_file_path is None:
			raise Exception("[-] Json file path is not provided")
		
		with open(self.json_file_path, 'r', encoding='utf-8') as f:
			old_json = json.load(f)['news']

		new_json = self.parse_news_markdown()
		
		# Update the old json with the new json
		for key, value in new_json.items():
			old_json[key] = value

		# Write the new json to the json file
		with open(self.json_file_path, 'w', encoding='utf-8') as f:
			json.dump({'news': old_json}, f, indent=4, ensure_ascii=False)