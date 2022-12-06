import BottomPopup from './components/bottom-popup/bottom-popup.vue'
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
import Popup from './components/popup/popup.vue'
import Section from './components/section/section.vue'
import Badge from './components/badge/badge.vue'

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    'wei-container': typeof Container
    'wei-cell': typeof Cell
    'wei-cell-group': typeof CellGroup
    'wei-button': typeof Button
    'wei-bottom-popup': typeof BottomPopup
    'wei-cascader': typeof Cascader
    'wei-checkbox-btns': typeof CheckboxBtns
    'wei-field': typeof Field
    'wei-form': typeof Form
    'wei-form-item': typeof FormItem
    'wei-icon': typeof Icon
    'wei-list': typeof List
    'wei-loadmore': typeof Loadmore
    'wei-nav-bar': typeof NavBar
    'wei-number-input': typeof NumberInput
    'wei-picker-popup': typeof PickerPopup
    'wei-picker-view': typeof PickerView
    'wei-popover': typeof Popover
    'wei-safe-bottom': typeof SafeBottom
    'wei-search': typeof Search
    'wei-sort-label': typeof SortLabel
    'wei-sticky': typeof Sticky
    'wei-tabs': typeof Tabs
    'wei-tooltip': typeof Tooltip
    'wei-watermark': typeof Watermark
    'wei-popup': typeof Popup
    'wei-section': typeof Section
    'wei-badge': typeof Badge
  }
}
