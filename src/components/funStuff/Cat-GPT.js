import { Component, createRef } from "react";
import './Cat-GPT.css';
import { TypeAnimation } from "react-type-animation";
import axios from "axios";

export default class CatGPT extends Component {
	constructor(props) {
		super(props);
		this.state = {
			chatHistory: [],  // Contains an array of ChatMessageComponent
			chatHistoryToSave: [],  // Contains and array of ChatMessageComponent (usrMsg is not animated)
			canUserSend: false,
			isBotReplyLoading: false,
			chatLength: 0,
			invertUserSide: false,
			maxChatHistoryLength: 3 // dont wanna ping cataas so many time
		};
		this.textareaRef = createRef();
		this.msgAreaDummyRef = createRef();
		this.msgAreaRef = createRef();

		this.welcomeMessage = "Meow meow! meow meow meow? meow meow meow! meow meow meow meow - meow meow!";
		this.textArray = [
			`Meow. Meow meow meow. Meow, meow meow meow meow, meow. Meow meow, meow meow meow. Meow meow. Meow meow, meow. Meow meow, meow meow. Meow meow meow. Meow meow meow meow. Meow.`,
			`Meow. Meow meow. Meow - meow meow. Meow meow, meow. Meow meow - meow meow meow. Meow meow. Meow meow - meow. Meow meow meow. Meow meow meow meow. Meow.`,
			`Meow meow meow meow - meow meow! Meow meow - meow meow meow. Meow meow meow meow meow - meow meow? Meow meow meow meow meow meow - meow meow meow meow. Meow meow meow meow meow - meow meow meow meow meow meow.`,
			`Meow, meow meow meow, meow - meow meow! Meow meow, meow - meow meow meow. Meow meow meow meow, meow meow - meow meow? Meow meow meow meow, meow meow meow - meow meow meow meow. Meow meow meow meow, meow meow - meow meow meow meow, meow meow.`
		];
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
			const message = this.welcomeMessage;
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

			this.setState((prevState) => ({ chatHistory: chatHistory, chatHistoryToSave: chatHistoryToSave, chatLength: prevState.chatLength + 1, canUserSend: true }));
		}
	};

	componentDidUpdate(prevProps, prevState) {
		if (this.state.invertUserSide !== prevState.invertUserSide) return;
		this.msgAreaDummyRef.current?.scrollIntoView({ behavior: 'smooth' });
	}

	handleMessageSubmission = () => {
		if (!this.state.canUserSend || this.textareaRef.current.value.trim() === '' || this.state.chatHistory.at(-1).props.isUser) return;
		this.textareaRef.current.blur();
		this.setState({ canUserSend: false });
		const messageContent = this.textareaRef.current.value;
		this.textareaRef.current.value = "";

		const { chatHistory, chatHistoryToSave } = this.state;
		chatHistory.push(<ChatMessageComponent key={this.state.chatLength} isUser={true} userMsg={messageContent} />);
		chatHistoryToSave.push(<ChatMessageComponent key={this.state.chatLength} isUser={true} userMsg={messageContent} />);

		this.setState((prevState) => ({
			chatHistory: chatHistory,
			chatHistoryToSave: chatHistoryToSave,
			chatLength: prevState.chatLength + 1,
			isBotReplyLoading: true
		}));

		setTimeout(() => {
			this.handleMessageReply();
		}, Math.floor(Math.random() * 500 + 1000));
	};

	handleMessageReply = async () => {
		const { image, message } = await this.createReply();

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

		this.setState((prevState) => ({
			chatHistory: chatHistory,
			chatHistoryToSave: chatHistoryToSave,
			chatLength: prevState.chatLength + 1,
			canUserSend: true,
			isBotReplyLoading: false
		}));

		localStorage.setItem("catGPTChatHistory", JSON.stringify(this.state.chatHistoryToSave));
	};

	createReply = async () => {
		function getRandomInt(min, max) {
			return Math.floor(Math.random() * (max - min) + min);
		}

		const message = this.textArray[getRandomInt(0, this.textArray.length - 1)];

		// Image / gif (i dont care about your internet bandwidth / mobile data)
		var imageUrl = null;
		if (Math.random() < 0.8) {
			await axios.get(`https://cataas.com/cat/${Math.random() < 0.7 ? "cute" : "gif"}?json=true`, { timeout: 2000 }).then(
				response => {
					imageUrl = `https://cataas.com${response.data.url}`;
				}
			).catch(async (e) => {
				console.log("cant gets cataas.com catz, tries awternatwif");
				await axios.get("https://api.thecatapi.com/v1/images/search").then(
					response => {
						imageUrl = response.data[0]?.url;
						console.log("oh damns it works");
					}
				).catch(e => { console.log("cant gets api.thecatapi.com, gonna gif ups meow"); });
			});
		}
		return { image: imageUrl, message: message };
	};

	handleDeleteHistoryButton = () => {
		localStorage.removeItem("catGPTChatHistory");

		const chatHistory = [];
		const chatHistoryToSave = [];

		const message = this.welcomeMessage;

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
		this.setState({ chatHistory: chatHistory, chatHistoryToSave: chatHistoryToSave, chatLength: 1, canUserSend: true, isBotReplyLoading: false });
	};

	render() {
		return (
			<div className="content-segment">
				<div className="content-header">
					<i className="content-header-side-button fa fa-angle-left" aria-hidden="true" onClick={() => { this.props.router.navigate(-1); }} />
					<div className="content-header-title" onClick={() => { this.setState({}); }}>{CatGPT.displayName}</div>
					<i className="content-header-side-button fa fa-trash" aria-hidden="true" onClick={this.handleDeleteHistoryButton} />
				</div>
				<div className="content-wrapper cat-gpt-content-wrapper">
					<div className="cat-gpt-msgs" ref={this.msgAreaRef}>
						{this.state.chatHistoryToSave.map((elem, index) => (
							<ChatMessageComponent
								key={index}
								invert={this.state.invertUserSide}
								isUser={elem.props.isUser}
								userImg={elem.props.userImg}
								userMsg={elem.props.userMsg} />))}
						<div ref={this.msgAreaDummyRef}>
							{this.state.isBotReplyLoading &&
								<ChatMessageComponent
									ignoreFormat={true}
									key={69696969}
									invert={this.state.invertUserSide}
									isUser={false}
									userMsg={<i className="fa fa-spinner fa-spin fa-fw" />} />}
						</div>
					</div>
					<div className="cat-gpt-input-container">
						<textarea
							className="cat-gpt-input"
							placeholder="Send a message"
							ref={this.textareaRef}
							onKeyDown={(evt) => {
								if (evt.shiftKey && evt.key === 'Enter') {
									;
								}
								else if (evt.key === 'Enter') {
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
		this.userMsg = this.props.userMsg;
	}

	render() {
		return (
			<div className={`cat-gpt-chat-msg-container ${(this.isUser && this.props.invert) ? "cat-gpt-chat-msg-container-user" : ""}`}>
				<img className="cat-gpt-chat-msg-img" src={`${this.isUser ? "./images/shuba.png" : "./images/bathing_chomusuke.png"}`} alt="user" />
				<div className={`cat-gpt-chat-msg-content ${this.isUser ? "cat-gpt-chat-msg-content-user" : ""}`}>
					{this.userImg && <img src={this.userImg} alt="cutesies" />}
					{!this.props.ignoreFormat ?
						this.userMsg.split("\n").map((line, index) =>
						(line === '' ?
							<div key={index}>&nbsp;</div>
							:
							<div key={index}>{line}</div>))
						:
						this.userMsg}
				</div>
			</div>
		);
	}
}
