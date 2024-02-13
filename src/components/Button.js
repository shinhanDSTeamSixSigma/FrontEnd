export default function Button({ name, widthHeight }) {
    return (
        <>
            <button
                type="button"
                className={`${widthHeight} block rounded-md bg-[#80BCBD] px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-[#4F6F52]`}
            >
                {name}
            </button>
        </>
    );
}
