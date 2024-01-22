import CoverCell from "./CoverCell"
export default function CoverRow({row, array}) {

  return (
    <div>
      {row.map((item, index) => (
        <CoverCell key={'R' + row + 'I' + index} opaque={item}/>
      ))}
    </div>
  )
}
