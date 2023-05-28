import json_formatter


class GenericJSONFormatter(json_formatter.JSONFormatter):
    def __init__(self):
        super().__init__()

 # This function is for reading the markdown file content, and formatting it into json
    # The markdown file should be in the following format:
    # ---
    # # <Title> -- This is the header and would be the title of the news, and formatted as the key of the json, while the key is an object
    # and the following line would be formatted as one of the object value of the json as the subtitle
    # optional whitespace
    # ## Icon -- This is the icon of the news, and the following line would be formatted as one of the object value of the json
    # optional whitespace
    # ## Route Link -- This is the title of the news, and the following line would be formatted as one of the object value of the json, if no ## Title then ignore this
    # optional whitespace
    # ## Body -- This is the body of the news, and the following line would be formatted as one of the object value of the json, with one line break, and the following lines would all be considered as the body, until the next ## is found
    # optional whitespace
    # ## Date -- This is the date (last updated date) of the news, and the following line would be formatted as one of the object value of the json
    # optional whitespace
    def input_markdown_to_json(self, markdownFile):
        with open(markdownFile, 'r', encoding='utf-8') as f:
            lines = f.readlines()

        json = {}

        # Find the title, which is the first line that starts with '#'
        title = None
        for line in lines:
            if line.startswith('#'):
                title = line.strip('#').strip()
                break

        if (title is None):
            raise Exception(f"[-] Title for {markdownFile} is not found")

        json['displayName'] = title

        # Find the subtitle, which is the one line that starts after the title, ignoring whitespace
        subtitle = None

        index = lines.index("# " + title + "\n")

        for line in lines[index + 1:]:
            if line.strip() != '':
                subtitle = line.strip()
                break

        if (subtitle is None):
            raise Exception(f"[-] Subtitle for {markdownFile} is not found")

        json["subtitle"] = subtitle

        # Find the icon source, which is the one line that starts after '## Icon', ignoring whitespace, unless there is no '## Icon'
        icon = None

        for line in lines:
            if line.startswith('## Icon'):
                for nextLine in lines[lines.index(line) + 1:]:
                    if nextLine.strip() != '':
                        icon = nextLine.strip()
                        break

        if (icon is None):
            print(f"[!] Icon for {markdownFile} is not found")
        else:
            json["icon"] = icon

        # Find the image link, which is the one line that starts after '## Image Link', ignoring whitespace, unless there is no '## Image Link'
        routeLink = None
        for line in lines:
            if line.startswith('## Route Link'):
                for nextLine in lines[lines.index(line) + 1:]:
                    if nextLine.strip() != '':
                        routeLink = nextLine.strip()
                        break

        if (routeLink is None):
            print(f"[!] Image link for {markdownFile} is not found")
        else:
            json["routeLink"] = routeLink

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
    fun_stuff_json_formatter = GenericJSONFormatter()
    fun_stuff_json_formatter.set_json_file_path(
        r'C:\Users\bryan\Documents\GitHub\bryanluwz.github.io\src\main\funStuff.json')
    fun_stuff_json_formatter.set_input_folder_path(
        r'C:\Users\bryan\Documents\GitHub\bryanluwz.github.io\src\markdowns\fun-stuff')
    fun_stuff_json_formatter.update_json(mainKey='fun-stuff')

    uni_stuff_json_formatter = GenericJSONFormatter()
    uni_stuff_json_formatter.set_json_file_path(
        r'C:\Users\bryan\Documents\GitHub\bryanluwz.github.io\src\main\uniStuff.json')
    uni_stuff_json_formatter.set_input_folder_path(
        r'C:\Users\bryan\Documents\GitHub\bryanluwz.github.io\src\markdowns\uni')
    uni_stuff_json_formatter.update_json(mainKey='uni-stuff')
