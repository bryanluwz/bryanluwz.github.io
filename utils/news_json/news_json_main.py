import news_json_utils

news_json_formatter = news_json_utils.NewsJSONFormatter()
news_json_formatter.set_json_file_path(r'C:\Users\bryan\Documents\GitHub\bryanluwz.github.io\src\main\news.json')
news_json_formatter.set_news_folder_path(r'C:\Users\bryan\Documents\GitHub\bryanluwz.github.io\src\news')
news_json_formatter.update_json()