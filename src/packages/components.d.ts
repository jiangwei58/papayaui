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
import Steps from './components/steps/steps.vue'
import Switch from './components/switch/switch.vue'
import Tag from './components/tag/tag.vue'
import Transition from './components/transition/transition.vue'
import InputNumber from './components/input-number/input-number.vue'
import Textarea from './components/textarea/textarea.vue'

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    'pa-container': typeof Container
    'pa-cell': typeof Cell
    'pa-cell-group': typeof CellGroup
    'pa-button': typeof Button
    'pa-bottom-popup': typeof BottomPopup
    'pa-cascader': typeof Cascader
    'pa-checkbox-btns': typeof CheckboxBtns
    'pa-field': typeof Field
    'pa-form': typeof Form
    'pa-form-item': typeof FormItem
    'pa-icon': typeof Icon
    'pa-list': typeof List
    'pa-loadmore': typeof Loadmore
    'pa-nav-bar': typeof NavBar
    'pa-number-input': typeof NumberInput
    'pa-picker-popup': typeof PickerPopup
    'pa-picker-view': typeof PickerView
    'pa-popover': typeof Popover
    'pa-safe-bottom': typeof SafeBottom
    'pa-search': typeof Search
    'pa-sort-label': typeof SortLabel
    'pa-sticky': typeof Sticky
    'pa-tabs': typeof Tabs
    'pa-tooltip': typeof Tooltip
    'pa-watermark': typeof Watermark
    'pa-popup': typeof Popup
    'pa-section': typeof Section
    'pa-badge': typeof Badge
    'pa-steps': typeof Steps
    'pa-switch': typeof Switch
    'pa-tag': typeof Tag
    'pa-transition': typeof Transition
    'pa-input-number': typeof InputNumber
    'pa-textarea': typeof Textarea
  }
}
