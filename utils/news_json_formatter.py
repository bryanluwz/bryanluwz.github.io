# This Python file is for compiling / managing the news json file
import json_formatter


class NewsJSONFormatter (json_formatter.JSONFormatter):
    # User has to provide the path to the news folder and the json file as the output
    def __init__(self) -> None:
        super().__init__()

    # This function is for reading the markdown file content, and formatting it into json
    # The markdown file should be in the following format:
    # ---
    # # <Title> -- This is the header and would be the title of the news, and formatted as the key of the json, while the key is an object
    # and the following line would be formatted as one of the object value of the json as the subtitle
    # optional whitespace
    # ## Image -- This is the image of the news, and the following line would be formatted as one of the object value of the json
    # optional whitespace
    # ## Link Image -- This is the link of the image of the news, and the following line would be formatted as one of the object value of the json, if no ## Image Link then ignore this
    # optional whitespace
    # ## Title -- This is the title of the news, and the following line would be formatted as one of the object value of the json, if no ## Title then ignore this
    # optional whitespace
    # ## Body -- This is the body of the news, and the following line would be formatted as one of the object value of the json, with one line break, and the following lines would all be considered as the body, until the next ## is found
    # optional whitespace
    # ## Date -- This is the date (last updated date) of the news, and the following line would be formatted as one of the object value of the json
    # optional whitespace
    def input_markdown_to_json(self, markdownFile):
        with open(markdownFile, 'r', encoding='utf-8') as f:
            lines = f.readlines()
            # lines = [line.strip() for line in lines if line.strip() != '']

        json = {}

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

        # Find the image link, which is the one line that starts after '## Image Link', ignoring whitespace, unless there is no '## Image Link'
        imageLink = None
        for line in lines:
            if line.startswith('## Link Image'):
                for nextLine in lines[lines.index(line) + 1:]:
                    if nextLine.strip() != '':
                        imageLink = nextLine.strip()
                        break

        if (imageLink is None):
            print(f"[!] Image link for {markdownFile} is not found")
        else:
            json["imgLink"] = imageLink

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


if __name__ == "__main__":
    news_json_formatter = NewsJSONFormatter()
    news_json_formatter.set_json_file_path(
        r'C:\Users\bryan\Documents\GitHub\bryanluwz.github.io\src\main\news.json')
    news_json_formatter.set_input_folder_path(
        r'C:\Users\bryan\Documents\GitHub\bryanluwz.github.io\src\news')
    news_json_formatter.update_json()
