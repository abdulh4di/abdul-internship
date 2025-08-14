
const RecommendedItemSkeleton = () => {
    return (
        <>
            <div className="item">
                <div className="item__img__wrapper">
                    <div className="skeleton skeleton-item__img"></div>
                </div>
                    <div className="item__details">
                        <div className="item__details__name">
                            <div className="skeleton skeleton-item__details__name"></div>
                        </div>
                        <div className="item__details__price">
                            <div className="skeleton skeleton-item__details__price"></div>
                        </div>
                        <div className="item__details__last-sale">
                            <div className="skeleton skeleton-item__details__last-sale"></div>
                        </div>
                    </div>
            </div>
        </>
    );
}

export default RecommendedItemSkeleton;
