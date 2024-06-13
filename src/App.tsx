import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  const [friends, setFriends] = useState<string>("");
  const [coins, setCoins] = useState<string>("");
  const [coinFriend, setCoinFriend] = useState<string[]>([]);
  const [info, setInfo] = useState({
    coins: "",
    friends: "",
  });
  const [currentVillage, setCurrentVillage] = useState<number>(0);
  const [showInputTravel, setShowInputTravel] = useState<boolean>(false);
  const [showTravel, setShowTravel] = useState<JSX.Element[]>([]);
  const [continueTravel, setContinueTravel] = useState<JSX.Element[]>([]);

  const handleTravel = () => {
    const coinsInt = parseInt(coins, 10);
    const friendsInt = parseInt(friends, 10);

    if (friendsInt > 5) {
      toast.error("Too Many Friends, Maximum of 5 Allowed");
      return;
    }
    if (isNaN(coinsInt) || coinsInt === 0) {
      toast.error("Input Coins");
      return;
    }

    const newShowTravel = [];
    let remainingCoins = coinsInt;
    let currentVillage = 0;

    for (let i = 0; i < coinsInt; i++) {
      remainingCoins--;
      currentVillage++;
      newShowTravel.push(<span key={i}>Village {currentVillage} </span>);
    }

    setCurrentVillage(currentVillage);

    if (remainingCoins === 0) {
      toast.error("No Coins Left");
      toast.success(`Arrived At Village ${currentVillage}`);

      setShowInputTravel(true);
    }

    setShowTravel(newShowTravel);
    setContinueTravel([]);
    setCoinFriend(Array(friendsInt).fill(""));
    setFriends("");
    setCoins("");
  };

  const handleContinueTravel = () => {
    const coinContinue = coinFriend.reduce(
      (acc, val) => acc + parseInt(val || "0", 10),
      0
    );

    if (coinFriend.some((val) => isNaN(parseInt(val, 10)) || val === "")) {
      toast.error("Input Friends Coin Value");
      return;
    }

    const newContinueTravel = [];
    let currentCoin = coinContinue;
    let currentContinueVillage = currentVillage;
    for (let i = 0; i < coinContinue; i++) {
      currentContinueVillage++;
      currentCoin--;
      newContinueTravel.push(
        <span key={i + currentVillage}>Village {currentContinueVillage} </span>
      );
    }

    if (currentCoin === 0) {
      toast.success(`Arrived At Village ${currentContinueVillage}`);
    }
    setContinueTravel(newContinueTravel);
    setCurrentVillage(currentContinueVillage);
  };

  const handleCoinFriendChange = (index: number, value: string) => {
    const newCoinFriend = [...coinFriend];
    newCoinFriend[index] = value;
    setCoinFriend(newCoinFriend);
  };

  return (
    <>
      <ToastContainer />
      <div className="container">
        <div className="cardLeft">
          <h2 className="title">Travel Requirements</h2>
          <br />
          <input
            value={coins}
            onChange={(e) => {
              setCoins(e.target.value);
              setInfo({ ...info, coins: e.target.value });
            }}
            type="number"
            placeholder="Enter Coins"
            className="input"
          />
          <input
            value={friends}
            onChange={(e) => {
              setFriends(e.target.value);
              setInfo({ ...info, friends: e.target.value });
            }}
            type="number"
            placeholder="Enter Friends"
            className="input"
          />
          <button onClick={handleTravel} className="button">
            Travel
          </button>

          {showInputTravel && (
            <>
              {coinFriend.map((value, index) => (
                <input
                  key={index}
                  type="number"
                  value={value}
                  onChange={(e) =>
                    handleCoinFriendChange(index, e.target.value)
                  }
                  placeholder={`Friend ${index + 1} Borrowed Coins`}
                  className="input"
                />
              ))}
              <button onClick={handleContinueTravel} className="button">
                Continue Travel
              </button>
            </>
          )}
        </div>
        <div className="cardRight">
          <h2 className="title">Information</h2>

          <p>Starting Point: Village 0</p>
          <p>Current Village Position: {currentVillage}</p>
          <p>Coins Enter: {info.coins}</p>
          <p>Friends Enter: {info.friends}</p>
          <br />
          <h3>First Travel Details:</h3>
          <div className="travel">{showTravel.map((item) => item)}</div>
          <h3>Continue Travel Details:</h3>
          <div className="travel">{continueTravel.map((item) => item)}</div>
        </div>
      </div>
    </>
  );
}

export default App;
