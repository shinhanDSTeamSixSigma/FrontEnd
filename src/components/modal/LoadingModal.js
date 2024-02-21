import '../../styles/loadingModal.css';

export default function LoadingModal() {
    return (
        <>
            <section class="box">
                {/* <!-- 로딩 --> */}
                <div class="loading on">
                    <div class="indicator">
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
