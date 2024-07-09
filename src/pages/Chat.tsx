import {
  Timestamp,
  addDoc,
  collection,
  // getDocs,
  onSnapshot,
  query,
} from "firebase/firestore";
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import { db } from "../config/firebaseConfig";
// import { Date } from "firebase/vertexai-preview";
import { Button, Card, FloatingLabel, Form, Stack } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";

type Message = {
  author: string;
  text: string;
  date: Timestamp | number;
  id: string;
};

function Chat() {
  const { user } = useContext(AuthContext);

  const [messages, setMessages] = useState<Message[] | null>(null);

  const [messageText, setMessageText] = useState("");

  // const getMessages = async () => {
  //   const querySnapshot = await getDocs(collection(db, "chat"));
  //   const messagesArray: Message[] = [];
  //   querySnapshot.forEach((doc) => {
  //     //   console.log("doc :>> ", doc.id);

  //     //   console.log(`${doc.id} => ${doc.data().date.seconds}`);
  //     //? If you want to INCLUDE the ID of the message document in your message state
  //     const messageWithId = {
  //       author: doc.data().author,
  //       text: doc.data().text,
  //       date: doc.data().date.seconds,
  //       id: doc.id,
  //     };
  //     messagesArray.push(messageWithId as Message);
  //     //? otherwise, if you don't want to include the id, you can just set the data with doc.data() as below
  //     //   messagesArray.push(doc.data() as Message);
  //   });
  //   setMessages(messagesArray);
  // };

  const getMessagesRealTime = () => {
    const q = query(collection(db, "chat"));
    onSnapshot(q, (querySnapshot) => {
      const messagesArray: Message[] = [];
      querySnapshot.forEach((doc) => {
        const messageWithId: Message = {
          author: doc.data().author,
          text: doc.data().text,
          date: doc.data().date.seconds,
          id: doc.id,
        };
        //   messagesArray.push(doc.data().name);
        messagesArray.push(messageWithId);
      });
      setMessages(messagesArray);
    });
  };

  const hanldeMessageSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("sending message");
    const newMessage = {
      author: user!.email,
      text: messageText,
      date: new Date(),
    };

    try {
      const docRef = await addDoc(collection(db, "chat"), newMessage);

      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const formatDate = (seconds: number) => {
    const formattedDate = new Date(seconds * 1000).toLocaleString();
    return formattedDate;
  };

  const handleMessageTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    // console.log(e.target.value);
    setMessageText(e.target.value);
  };

  useEffect(() => {
    // getMessages();
    getMessagesRealTime();
  }, []);

  return (
    <div>
      <h1>Chat</h1>
      <div>
        <Stack gap={3} className="align-items-center">
          {messages &&
            messages.map((message) => {
              //   console.log("message>>>", message);
              return (
                <Card
                  style={{ width: "18rem" }}
                  bg="light"
                  text="dark"
                  className="p-2"
                  //   key={index}
                  key={message.id}
                >
                  <Card.Body>
                    <Card.Title>{message.author}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {/* {formatDate(message.date.seconds)} */}
                      {formatDate(message.date as number)}
                    </Card.Subtitle>
                    <Card.Text>{message.text}</Card.Text>
                  </Card.Body>
                </Card>
              );
            })}
          <Form onSubmit={hanldeMessageSubmit}>
            <FloatingLabel
              controlId="floatingInput"
              label="message"
              className="mb-3"
            >
              <Form.Control
                as="textarea"
                placeholder="message"
                onChange={handleMessageTextChange}
              />
            </FloatingLabel>
            <Button type="submit">Send</Button>
          </Form>
        </Stack>
      </div>
    </div>
  );
}

export default Chat;
