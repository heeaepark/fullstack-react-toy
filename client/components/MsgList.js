import { useState } from "react";
import MsgInput from "./MsgInput";
import MsgItem from "./MsgItem";

const userId = ["roy", "jay"];
const getRandomUserId = () => userId[Math.round(Math.random())]; // userId는 roy / jay 중 랜덤하게 할당

const originalMsgs = Array(50) // 임의의 50개 아이템이 담긴 배열 생성
  .fill(0) // map을 돌리기 위해 .fill()을 이용하여 임의의 숫자를 넣고 값을 채운다.
  // map 반복문을 돌려 50개 배열만큼 데이터 생성
  .map((_, i) => ({
    id: i + 1,
    userId: getRandomUserId(),
    timestamp: 1234567890123 + i * 1000 * 60, // 임의의 날짜에서 1분단위로 타임스탬프 생성
    text: `${i + 1} mock text`,
  }))
  .reverse();

/* //아래 반복 작업을 제거 하기 위해 위처럼 변경
[
  {
    id: 1,
    userId: getRandomUserId(),
    timestamp: 1234567890123,
    text: '1 mock text'
  },
  {
    id: 2,
    userId: getRandomUserId(),
    timestamp: 1234567890456,
    text: '2 mock text'
  }
] */

const MsgList = () => {
  const [msgs, setMsgs] = useState(originalMsgs);
  const [editingId, setEditingId] = useState(null);

  const onCreate = (text) => {
    const newMsg = {
      id: msgs.length + 1,
      userId: getRandomUserId(),
      timestamp: Date.now(), // 임의의 날짜에서 1분단위로 타임스탬프 생성
      text: `${msgs.length + 1} ${text}`,
    };
    setMsgs((msgs) => [newMsg, ...msgs]);
  };

  const onUpdate = (text, id) => {
    setMsgs((msgs) => {
      const targetIndex = msgs.findIndex((msg) => msg.id === id);
      if (targetIndex < 0) return msgs;
      const newMsgs = [...msgs];
      newMsgs.splice(targetIndex, 1, {
        ...msgs[targetIndex],
        text,
      });
      return newMsgs;
    });
    doneEdit();
  };

  const doneEdit = () => setEditingId(null);

  const onDelete = (id) => {
    setMsgs((msgs) => {
      const targetIndex = msgs.findIndex((msg) => msg.id === id);
      if (targetIndex < 0) return msgs;
      const newMsgs = [...msgs];
      newMsgs.splice(targetIndex, 1);
      return newMsgs;
    });
  };

  return (
    <>
      <MsgInput mutate={onCreate} />
      <ul className="messages">
        {msgs.map((x) => (
          <MsgItem
            key={x.id}
            {...x}
            onUpdate={onUpdate}
            onDelete={() => onDelete(x.id)}
            startEdit={() => setEditingId(x.id)}
            isEditing={editingId === x.id}
          />
        ))}
      </ul>
    </>
  );
};

export default MsgList;
