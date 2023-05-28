# This Python file is for compiling / managing the news / uni / fun-stuff / etc json file
import os
import json


class JSONFormatter:
    # User has to provide the path to the news folder and the json file as the output
    def __init__(self) -> None:
        self.json_file = None  # This is the json file to be written to the json file path
        self.json_file_path = None  # This is the path to the json file

        self.input_folder_path = None  # This is the path to the news folder
        self.input_markdown_paths = []  # This is the list of paths to the markdown files

    # This function is for setting the input folder path
    def set_input_folder_path(self, input_folder_path: str) -> None:
        self.input_folder_path = input_folder_path

    # This function is for setting the json file path
    def set_json_file_path(self, json_file_path: str) -> None:
        self.json_file_path = json_file_path

    # This function is for loading all the markdown file from the input folder, and store the full path in a list
    def load_input_folder(self) -> None:
        if self.input_folder_path is None:
            raise Exception("News folder path is not provided")

        self.input_markdown_paths.clear()
        self.input_markdown_paths = os.listdir(self.input_folder_path)
        self.input_markdown_paths = [os.path.join(self.input_folder_path, input_markdown_path)
                                     for input_markdown_path in self.input_markdown_paths if input_markdown_path.endswith('.md')]

    # This function is to parse all the markdown file
    def parse_inputs(self):
        if self.input_folder_path is None:
            raise Exception("Input folder path is not provided")

        if len(self.input_markdown_paths) == 0:
            self.load_input_folder()

        json = {}

        for news_markdown_path in self.input_markdown_paths:
            try:
                key, value = self.input_markdown_to_json(news_markdown_path)
                json[key] = value
            except Exception as e:
                print(e)
                print("Skipping this file")

        return json

    # This function is for reading the markdown file content, and formatting it into json
        # The parsing will be done by the user
    def input_markdown_to_json(self, markdown_file_path: str):
        return (None, None)

    # This function will read the contents of the json file as a variable, and update the json with the new json
    def update_json(self):
        if self.json_file_path is None:
            raise Exception("[-] Json file path is not provided")

        with open(self.json_file_path, 'r', encoding='utf-8') as f:
            old_json = json.load(f)['news']

        new_json = self.parse_inputs()

        # Update the old json with the new json
        for key, value in new_json.items():
            old_json[key] = value

        # Write the new json to the json file
        with open(self.json_file_path, 'w', encoding='utf-8') as f:
            json.dump({'news': old_json}, f, indent=4, ensure_ascii=False)
