export default function Button(props) {
  const buttonStyle = {
    fontSize: props.fontSize || '0.7rem', // 원하는 글씨 크기로 조절
    backgroundColor: props.backgroundColor || '#90C8AC', // 원하는 배경색으로 조절
    hoverBackgroundColor: props.hoverBackgroundColor || '#C4DFAA', // 원하는 호버 배경색으로 조절
  };

  const buttonClassName = `
    rounded-md
    px-2.5
    py-1.5
    text-sm
    font-semibold
    text-white
    shadow-sm
    ring-1
    ring-inset
    ring-gray-300
    hover:bg-${buttonStyle.hoverBackgroundColor}
  `;

  return (
    <>
      <button
        type="button"
        style={{ ...buttonStyle }}
        className={buttonClassName}
      >
        {props.name}
      </button>
    </>
  );
}
