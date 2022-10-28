import ButtomPopup from './components/bottom-popup/bottom-popup.vue'
import Button from './components/button/button.vue'
import Cascader from './components/cascader/cascader.vue'
import CellGroup from './components/cell-group/cell-group.vue'
import Cell from './components/cell/cell.vue'
import CheckboxBtns from './components/checkbox-btns/checkbox-btns.vue'
import Container from './components/container/container.vue'
import Field from './components/field/field.vue'
import FormItem from './components/form-item/form-item.vue'
import Form from './components/form/form.vue'
import Icon from './components/icon/icon.vue'
import List from './components/list/list.vue'
import Loadmore from './components/loadmore/loadmore.vue'
import NavBar from './components/nav-bar/nav-bar.vue'
import NumberInput from './components/number-input/number-input.vue'
import PickerPopup from './components/picker-popup/picker-popup.vue'
import PickerView from './components/picker-view/picker-view.vue'
import Popover from './components/popover/popover.vue'
import SafeBottom from './components/safe-bottom/safe-bottom.vue'
import Search from './components/search/search.vue'
import SortLabel from './components/sort-label/sort-label.vue'
import Sticky from './components/sticky/sticky.vue'
import Tabs from './components/tabs/tabs.vue'
import Tooltip from './components/tooltip/tooltip.vue'
import Watermark from './components/watermark/watermark.vue'

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    WeiContainer: typeof Container
    WeiCell: typeof Cell
    WeiCellGroup: typeof CellGroup
    WeiButton: typeof Button
    WeiButtomPopup: typeof ButtomPopup
    WeiCascader: typeof Cascader
    WeiCheckboxBtns: typeof CheckboxBtns
    WeiField: typeof Field
    WeiForm: typeof Form
    WeiFormItem: typeof FormItem
    WeiIcon: typeof Icon
    WeiList: typeof List
    WeiLoadmore: typeof Loadmore
    WeiNavBar: typeof NavBar
    WeiNumberInput: typeof NumberInput
    WeiPickerPopup: typeof PickerPopup
    WeiPickerView: typeof PickerView
    WeiPopover: typeof Popover
    WeiSafeBottom: typeof SafeBottom
    WeiSearch: typeof Search
    WeiSortLabel: typeof SortLabel
    WeiSticky: typeof Sticky
    WeiTabs: typeof Tabs
    WeiTooltip: typeof Tooltip
    WeiWatermark: typeof Watermark
  }
}
