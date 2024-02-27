import { prefix } from '../../api/farmApi';
import StyledBody from '../StyledBody';
const url = `${prefix}`;

export default function FarmImage({ imagePaths }) {
    return (
        <div>
            <div className="my-6 font-semibold">농장사진</div>

            <div className="rounded-2xl w-full flex flex-wrap">
                {imagePaths ? (
                    imagePaths.map((imagePath, idx) => (
                        <div className="flex flex-col w-[33%]">
                            <img
                                key={idx}
                                src={`${url}/${imagePath}`}
                                alt={`image ${idx}`}
                                className="h-36 rounded-2xl shadow-xl  ml-[1rem] mt-[1rem] "
                            />

                        </div>
                    ))
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
}
