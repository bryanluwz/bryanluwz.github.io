import { Component, createRef } from "react";
import './Cat-GPT.css';
import { TypeAnimation } from "react-type-animation";

export default class CatGPT extends Component {
	constructor(props) {
		super(props);
		this.state = {
			chatHistory: [],  // Contains an array of ChatMessageComponent
			chatHistoryToSave: [],  // Contains and array of ChatMessageComponent (usrMsg is not animated)
			canUserSend: false,
			chatLength: 0
		};
		this.textareaRef = createRef();
		this.msgAreaDummyRef = createRef();
	}

	componentDidMount() {
		// Get history of chat
		const savedChatHistory = localStorage.getItem("catGPTChatHistory");
		if (savedChatHistory) {
			this.setState({
				chatHistory: JSON.parse(savedChatHistory),
				chatHistoryToSave: JSON.parse(savedChatHistory),
				canUserSend: true
			}, () => { ; });
		} else {
			const { chatHistory, chatHistoryToSave } = this.state;
			const message = "meow meow! meow meow meow? meow meow meow! meow meow meow meow-meow-meow!";
			chatHistoryToSave.push(<ChatMessageComponent key={this.state.chatLength} isUser={false} userMsg={message} />);
			chatHistory.push(<ChatMessageComponent key={this.state.chatLength} isUser={false} userMsg={
				<TypeAnimation
					sequence={[message,
						() => {
							this.setState({ canUserSend: true });
							localStorage.setItem("catGPTChatHistory", JSON.stringify(chatHistoryToSave));
						}]}
					wrapper="div"
					speed={90}
					cursor={false}
				/>
			} />);

			this.setState((prevState) => ({ chatHistory: chatHistory, chatHistoryToSave: chatHistoryToSave, chatLength: prevState.chatLength + 1 }));
		}
	}

	componentDidUpdate() {
		this.msgAreaDummyRef.current?.scrollIntoView({ behavior: 'smooth' });
	}

	handleMessageSubmission = () => {
		if (!this.state.canUserSend || this.textareaRef.current.value.trim() === '' || this.state.chatHistory.at(-1).props.isUser) return;
		this.setState({ canUserSend: false });
		const messageContent = this.textareaRef.current.value;
		this.textareaRef.current.value = "";

		const { chatHistory, chatHistoryToSave } = this.state;
		chatHistory.push(<ChatMessageComponent key={this.state.chatLength} isUser={true} userMsg={messageContent} />);
		chatHistoryToSave.push(<ChatMessageComponent key={this.state.chatLength} isUser={true} userMsg={messageContent} />);

		this.setState((prevState) => ({ chatHistory: chatHistory, chatHistoryToSave: chatHistoryToSave, chatLength: prevState.chatLength + 1 }));

		setTimeout(() => {
			this.handleMessageReply();
		}, Math.floor(Math.random() * 500 + 1000));
	};

	handleMessageReply = () => {
		const { image, message } = this.createReply();

		const { chatHistory, chatHistoryToSave } = this.state;

		chatHistory.push(<ChatMessageComponent key={this.state.chatLength} isUser={false} userImg={image} userMsg={
			<TypeAnimation
				sequence={[message,
					() => {
						this.setState({ canUserSend: true });
					}]}
				wrapper="div"
				speed={90}
				cursor={false}
			/>
		} />);

		chatHistoryToSave.push(<ChatMessageComponent key={this.state.chatLength} isUser={false} userImg={image} userMsg={message} />);

		this.setState((prevState) => ({ chatHistory: chatHistory, chatHistoryToSave: chatHistoryToSave, chatLength: prevState.chatLength + 1 }));

		localStorage.setItem("catGPTChatHistory", JSON.stringify(this.state.chatHistoryToSave));
	};

	createReply = () => {
		function getRandomInt(max) {
			return Math.floor(Math.random() * Math.floor(max));
		}

		const meowCount = getRandomInt(30) + 20;

		const meows = Array(meowCount).fill('meow').join(', ');
		const punctuations = ['!', '!!', '?!', '...'][getRandomInt(4)]; // Random punctuation

		const image = Math.random() < 0.8 ? "./images/bathing_chomusuke.png" : undefined;

		return { image: image, message: `${meows}${punctuations}` };
	};

	handleDeleteHistoryButton = () => {
		localStorage.removeItem("catGPTChatHistory");

		const chatHistory = [];
		const chatHistoryToSave = [];

		const message = "meow meow! meow meow meow? meow meow meow! meow meow meow meow-meow-meow!";

		chatHistoryToSave.push(<ChatMessageComponent key={0} isUser={false} userMsg={message} />);
		chatHistory.push(<ChatMessageComponent key={0} isUser={false} userMsg={
			<TypeAnimation
				sequence={[message,
					() => {
						this.setState({ canUserSend: true });
						localStorage.setItem("catGPTChatHistory", JSON.stringify(chatHistoryToSave));
					}]}
				wrapper="div"
				speed={90}
				cursor={false}
			/>
		} />);
		this.setState({ chatHistory: chatHistory, chatHistoryToSave: chatHistoryToSave, chatLength: 1, canUserSend: true });
	};

	render() {
		return (
			<div className="content-segment">
				<div className="content-header">
					<i className="content-header-side-button fa fa-angle-left" aria-hidden="true" onClick={() => { this.props.router.navigate(-1); }} />
					<div className="content-header-title">{CatGPT.displayName}</div>
					<i className="content-header-side-button fa fa-trash" aria-hidden="true" onClick={this.handleDeleteHistoryButton} />
				</div>
				<div className="content-wrapper cat-gpt-content-wrapper">
					<div className="cat-gpt-msgs">
						{this.state.chatHistory.map((elem, index) => (<ChatMessageComponent key={index} isUser={elem.props.isUser} userImg={elem.props.userImg} userMsg={elem.props.userMsg} />))}
						<div ref={this.msgAreaDummyRef}></div>
					</div>
					<div className="cat-gpt-input-container">
						<textarea
							className="cat-gpt-input"
							placeholder="Send a message"
							ref={this.textareaRef}
							autoFocus={true}
							onKeyDown={(evt) => {
								if (evt.key === 'Enter') {
									evt.preventDefault();
									this.handleMessageSubmission();
								}
							}}
						/>
						<i className={`cat-gpt-input-submit fa fa-paper-plane ${(!this.state.canUserSend) ? "cat-gpt-input-submit-blocked" : ""}`} aria-hidden="true" onClick={this.handleMessageSubmission}></i>
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
		this.userImg = this.props.userImg;
		this.userMsg = this.props.userMsg;  // in markdown format
	}

	render() {
		return (
			<div className={`cat-gpt-chat-msg-container ${this.isUser ? "cat-gpt-chat-msg-container-user" : ""}`}>
				<img className="cat-gpt-chat-msg-img" src={`${this.isUser ? "./images/shuba.png" : "./images/bathing_chomusuke.png"}`} alt="user" />
				<div className={`cat-gpt-chat-msg-content ${this.isUser ? "cat-gpt-chat-msg-content-user" : ""}`}>
					{this.userImg && <img src={this.userImg} alt="cutesies" />}
					{this.userMsg}
				</div>
			</div>
		);
	}
}

