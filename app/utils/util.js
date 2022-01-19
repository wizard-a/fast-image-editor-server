module.exports = {
    /**
     * 获取缩放的图片宽高
     * @param {}} width 
     * @param {*} height 
     * @param {*} thumbWidth 
     * @param {*} thumbHeight 
     */
     getZoomImageSize(originWidth, originHeight, thumbWidth, thumbHeight) {
        
        const oRatio = originWidth / originHeight; // 源图片的比率
        const tRatio = thumbWidth /thumbHeight; // 缩略图的比率
        if (oRatio >= tRatio) { // 原图的比率比缩略图的搞，说明宽>=高
            
            if (originWidth > thumbWidth) {
                return {
                    width: thumbWidth,
                    height: originHeight * (thumbWidth / originWidth)
                }
            } else {
                return {
                    width: originWidth,
                    height: originHeight,
                }
            }    
        
        } else {
            if (originHeight > thumbHeight) {
                return {
                    width: originWidth * (thumbHeight / originHeight),
                    height: thumbHeight,
                }
            } else {
                return {
                    width: originWidth,
                    height: originHeight,
                }
            }    
    
        }
    
    }


}