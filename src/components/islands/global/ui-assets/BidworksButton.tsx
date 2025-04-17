

interface BidWorksButtonProps {
    label?: string;
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
    children?: React.ReactNode,
    rounded?: boolean,
    isLoading?: boolean
}

export const BidWorksButton = ({ label, onClick, disabled=false, className, rounded, children, isLoading }: BidWorksButtonProps) => {
    return (
        <button disabled={disabled} onClick={onClick} className={`${rounded ? 'rounded-full' : 'rounded-lg'} ${className + " w-full flex items-center gap-2 border-2 p-2 px-4 border-neutral-900 text-neutral-900 hover:text-neutral-200 hover:bg-neutral-900 transition cursor-pointer hover:shadow-[0_8px_0_#737373] active:shadow-[0_0_0_#737373] active:hover:translate-y-0 hover:-translate-y-2"}`}>
            {isLoading ? (
                <div className="mx-auto animate-spin rounded-full h-5 w-5 border-2 border-neutral-900 border-t-transparent" />
            ) : (
                <>
                    <p className="font-bold text-lg">{label}</p>
                    {children}
                </>
            )}
        </button>
    )
}