import Ably from "ably";

export default async function subscribeAbly(callback: (data: any) => void) {
  const ably = new Ably.Realtime.Promise(process.env.ABLY_API_KEY as string);
  await ably.connection.once("connected");
  const channel = ably.channels.get("chat");
  await channel.subscribe("message", (message: { data: any }) => {
    callback(message.data);
  });
}
