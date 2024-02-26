import { prefix } from '../../api/farmApi';
import StyledBody from '../StyledBody';
const url = `${prefix}`;

export default function FarmImage({ imagePaths }) {
    return (
        <div>
            <div className="my-6 font-semibold">농장사진</div>

            <div className="rounded-2xl w-full flex flex-wrap mb-20">
                {imagePaths ? (
                    imagePaths.map((imagePath, idx) => (
                        <img
                            key={idx}
                            src={`${url}/${imagePath}`}
                            alt={`image ${idx}`}
                            className="w-[45%] h-28 rounded-2xl shadow-xl mb-4 mx-[2.5%]"
                        />
                    ))
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
}
