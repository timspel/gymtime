interface ContentContainerProps {
    children?: React.ReactNode;
}

function ContentContainer({ children }: ContentContainerProps) {
    return (
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
            {children}
        </div>
    );
}

export default ContentContainer;