const install = function (app) {
    // el-select组件数据过多，使用翻页加载数据指令
    app.directive('el-select-loadmore', {
        beforeMount(el, binding) {
            const SELECTWRAP_DOM = el.querySelector('.el-select-dropdown .el-select-dropdown__wrap');
            SELECTWRAP_DOM.addEventListener('scroll', function () {
                // toFixed：把this.scrollTop转换为整数，兼容不同版本浏览器
                const condition = this.scrollHeight - this.scrollTop.toFixed(0) <= this.clientHeight;
                if (condition) binding.value();
            })
        }
    });
}
export default install;
