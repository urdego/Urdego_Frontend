const useGetWaitingRoomList = async () => {
  const response = await fetch('/api/waitingRoomList');
  if (!response.ok) {
    console.log('fail');
    return;
  }

  const data = await response.json();
  console.log(data);
};

export default useGetWaitingRoomList;
