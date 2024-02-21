export default function Paging({ serverData, movePage }) {
    return (
        <div className="m-6 flex justify-center pt-3">
            {serverData.prev ? (
                <div
                    className="m-2 p-2 w-16 text-center  font-bold text-blue-400 cursor-pointer"
                    onClick={() => movePage({ page: serverData.prevPage })}
                >
                    이전{' '}
                </div>
            ) : (
                <></>
            )}

            {serverData.pageNumList.map((pageNum) => (
                <div
                    key={pageNum}
                    className={`m-2 p-2 w-12  text-center rounded shadow-md text-white cursor-pointer ${
                        serverData.current === pageNum
                            ? 'bg-[#4F6F52]'
                            : 'bg-[#80BCBD]'
                    }`}
                    onClick={() => movePage({ page: pageNum })}
                >
                    {pageNum}
                </div>
            ))}

            {serverData.next ? (
                <div
                    className="m-2 p-2 w-16 text-center font-bold text-blue-400 cursor-pointer"
                    onClick={() => movePage({ page: serverData.nextPage })}
                >
                    다음
                </div>
            ) : (
                <></>
            )}
        </div>
    );
}
