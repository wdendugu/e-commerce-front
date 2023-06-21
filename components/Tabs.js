

export default function Tabs ({tabs,active,onChange}) {

    return (
        <div className="flex gap-5">
            {tabs.map(tabName => (
                <span 
                    onClick={()=>{onChange(tabName)}}
                    className={`text-3xl cursor-pointer ${tabName === active ? "border-b-2 border-black" : "text-gray-300"}`}
                    key={tabName}
                >
                    {tabName}
                </span>
            ))}
        </div>
    )
}