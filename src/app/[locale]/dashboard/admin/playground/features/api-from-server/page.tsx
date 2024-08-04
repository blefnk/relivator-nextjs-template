export default function APIFromServer() {
  // const res = await ofetch("http://localhost:3000/api/protected", {
  //   headers: headers(),
  //   method: "GET",
  // });
  // const resp = (await res.json()) as ApiResponse;
  return (
    <div>
      <div>
        API Route From <span className="font-bold underline">Server</span>
      </div>
      {/* <div>Name: {resp?.name}</div> */}
      <div>Name: ---</div>
    </div>
  );
}
