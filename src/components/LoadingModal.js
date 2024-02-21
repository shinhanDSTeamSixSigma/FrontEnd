import '../styles/loadingModal.css';

export default function LoadingModal() {
    return (
        <>
            <section className="box">
                {/* <!-- 로딩 --> */}
                <div className="loading on">
                    <div className="indicator">
                        <img
                            src="https://blog.kakaocdn.net/dn/vqTEy/btq9s83QrTK/VNg4A0KJqj3yZ6f3KHX9Rk/img.gif"
                            alt=""
                        />
                    </div>
                </div>
            </section>
        </>
    );
}
