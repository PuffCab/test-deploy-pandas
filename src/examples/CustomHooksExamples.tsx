import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { CharactersContext } from "../context/CharactersContext";
import useFetchData from "../hooks/useFetchData";
import useToggle from "../hooks/useToggle";
import useCountDown from "../hooks/useCountDown";

//Disclaimer: below types are only in this component for the exercise. In your project put them where they belong
type BlogType = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

type UserType = {
  name: string;
  username: string;
  email: string;
  phone: string;
};
function CustomHooksExamples() {
  const { characters } = useContext(CharactersContext);
  const { user } = useContext(AuthContext);
  // console.log("characters :>> ", characters);

  //? using custom fetch hook to fetch different APIs
  const { data, isLoading, error } = useFetchData<BlogType[]>(
    "https://jsonplaceholder.typicode.com/pos"
  );

  const { data: userData, isLoading: isLoading2 } = useFetchData<UserType>(
    "https://jsonplaceholder.typicode.com/users/1"
  );

  //? using custom hook to change toggle values
  const [onOffMessage, changeOnOff] = useToggle("On", "Off");
  const [shakespeareMsg, changeshakespeareMsg] = useToggle(
    "To Be",
    "or Not To Be"
  );

  //? using custom hook to set different timers

  const { countDownMessage } = useCountDown(2000);
  const { countDownMessage: countDownMessage2 } = useCountDown("5000asdasd");
  return (
    <div>
      {user ? (
        <h1>Welcome {user.name} to my website</h1>
      ) : (
        <h1>No user logged in</h1>
      )}
      <h2>Welcome to our fan website about Rick & Morty</h2>
      {characters && (
        <h3>We can show you {characters.length} Ricks and Mortys</h3>
      )}
      <hr />
      <h3>Blog Posts</h3>
      {isLoading && <h1>LOADING BLOGS</h1>}
      {data &&
        data.map((post, index) => {
          if (index < 4) {
            return <p>{post.title}</p>;
          }
        })}
      {error && <h1>{error}</h1>}
      <hr />
      <h3>User Info</h3>
      {isLoading2 && <h1>LOADING USER</h1>}

      {userData && (
        <>
          <p>{userData.name}</p>
          <p>{userData.email}</p>
          <p>{userData.phone}</p>
        </>
      )}
      <hr />
      <h3>Toggle/Switch section</h3>
      <label className="switch">
        <input type="checkbox" onChange={changeOnOff} />
        <span className="slider round"></span>
      </label>
      <p>{onOffMessage}</p>
      <label className="switch">
        <input type="checkbox" onChange={changeshakespeareMsg} />
        <span className="slider round"></span>
      </label>
      <p>{shakespeareMsg}</p>
      <hr />
      <h3>Countdown section</h3>
      {countDownMessage && <h3>{countDownMessage}</h3>}
      {countDownMessage2 && <h3>{countDownMessage2}</h3>}
    </div>
  );
}

export default CustomHooksExamples;
