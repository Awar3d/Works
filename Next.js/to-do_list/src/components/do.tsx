type Props = {
    label: string;
    toDel: () => void;
  };
  
export default function Do({ label, toDel }: Props) {
    function deleteDo() {
        toDel();
    }

    function today() {
        const date = new Date();
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}.${month}.${year}`;
      }
    return (
        <li className="flex items-center gap-2 bg-wave text-seaFoam w-full justify-center py-[15px] relative dark:text-chestNut dark:bg-pergament">
            <span className="text-xl absolute left-5">{today()}</span>
            <input className="w-5 h-5" type="checkbox" />
            <span className="text-xl">{label}</span>
            <svg onClick={deleteDo} className="absolute w-[35px] h-[35px] right-5 cursor-pointer" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
                <path fill="#F44336" d="M21.5 4.5H26.501V43.5H21.5z" transform="rotate(45.001 24 24)"></path><path fill="#F44336" d="M21.5 4.5H26.5V43.501H21.5z" transform="rotate(135.008 24 24)"></path>
            </svg>
        </li>
    );
}