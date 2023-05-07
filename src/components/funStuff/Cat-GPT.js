import { Component, createRef } from "react";
import ReactMarkdown from 'react-markdown';
import './Cat-GPT.css';

export default class CatGPT extends Component {
	constructor(props) {
		super(props);
		this.chatHistory = [
			<ChatMessageComponent isUser={false} userMsg={"meow meow! meow meow meow? meow meow meow! meow meow meow meow-meow-meow!"} />
		];  // Contains an array of ChatMessageComponent
		this.state = {
			canUserSend: true
		};
		this.textareaRef = createRef();
	}

	handleTextareaChange = () => {
		const { scrollHeight } = this.textareaRef.current;
		const textareaHeight = Math.min(scrollHeight - 25, 125);
		this.setState({ textareaHeight: textareaHeight });
	};

	handleMessageSubmission = () => {
		if (!this.state.canUserSend || this.textareaRef.current.value.trim() === '') return;
		this.setState({ canUserSend: false });
		const messageContent = this.textareaRef.current.value;
		this.textareaRef.current.value = "";
		this.chatHistory.push(<ChatMessageComponent isUser={true} userMsg={messageContent} />);
		setTimeout(() => {
			this.handleMessageReply();
			this.setState({ canUserSend: true });
		}, Math.floor(Math.random() * 500 + 400));
	};

	handleMessageReply = () => {
		const messageContent = this.createReply();
		this.chatHistory.push(<ChatMessageComponent isUser={false} userMsg={messageContent} />);
	};

	createReply = () => {
		function getRandomInt(max) {
			return Math.floor(Math.random() * Math.floor(max));
		}

		// const randomPhrase = phrases[getRandomInt(phrases.length)];
		const meowCount = getRandomInt(5) + 1; // Random number of meows (1 to 5)

		const meows = Array(meowCount).fill('meow').join(', ');
		const punctuations = ['!', '!!', '?!', '...'][getRandomInt(4)]; // Random punctuation

		return `![Cute Cat](./images/shuba.png)\n\n${meows}${punctuations}`;
	};

	render() {
		return (
			<div className="content-segment">
				<div className="content-header">
					<i className="content-header-back fa fa-angle-left" aria-hidden="true" onClick={() => { this.props.router.navigate(-1); }}></i>
					<div className="content-header-title">{CatGPT.displayName}</div>
				</div>
				<div className="content-wrapper cat-gpt-content-wrapper">
					<div className="cat-gpt-msgs">
						{this.chatHistory}
					</div>
					<div className="cat-gpt-input-container">
						<textarea
							className="cat-gpt-input"
							placeholder="Send a message"
							ref={this.textareaRef}
							onChange={this.handleTextareaChange}
							autoFocus={true}
							onKeyDown={(evt) => {
								if (evt.key === 'Enter') {
									evt.preventDefault();
									this.handleMessageSubmission();
								}
							}}
						/>
						<i className="cat-gpt-input-submit fa fa-search" aria-hidden="true" onClick={this.handleMessageSubmission}></i>
					</div>
				</div>
			</div>
		);
	}
}

CatGPT.displayName = "Cat GPT";

class ChatMessageComponent extends Component {
	constructor(props) {
		super(props);
		this.isUser = this.props.isUser;  // if user, then just show whole message, if cat gpt then slowly type out msg 
		this.userMsg = this.props.userMsg;  // in markdown format
	}

	render() {
		return (
			<div className={`cat-gpt-chat-msg-container ${this.isUser ? "cat-gpt-chat-msg-container-user" : ""}`}>
				<img className="cat-gpt-chat-msg-img" src={`${this.isUser ? "./images/shuba.png" : "./images/shuba.png"}`} alt="user" />
				<div className={`cat-gpt-chat-msg-content ${this.isUser ? "cat-gpt-chat-msg-content-user" : ""}`}>
					{this.userMsg}
				</div>
			</div>
		);
	}
}

