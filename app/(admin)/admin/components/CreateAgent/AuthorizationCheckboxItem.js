const AuthorizationCheckboxItem = ({
  title,
  permKey,
  onChangePermission,
  checked,
}) => {
  return (
    <li>
      <label className="checkbox flex items-center gap-3.5 cursor-pointer">
        <input
          type="checkbox"
          className="checkbox__input"
          checked={checked}
          onChange={(e) => onChangePermission(permKey, e.target.checked)}
        />
        <span className="checkbox__marker">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="4"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m4.5 12.75 6 6 9-13.5"
            />
          </svg>
        </span>
        <span className="text-sm/2.5 text-black tracking-[-0.12px]">
          {title}
        </span>
      </label>
    </li>
  );
};

export default AuthorizationCheckboxItem;
