import TimeForm from "./TimeForm"
export default function TimeDisplay({ time }) {

  return (
        <div>{Math.floor(time / 60)}:{time%60 < 10 ? '0' + time%60 : time%60}</div>
  )
}
