import { mergeLocaleMessages } from '../merge-locale-messages'
import common from './common.json'
import components from './components.json'
import features from './features.json'
import layout from './layout.json'
import menu from './menu.json'
import pages from './pages.json'

export default mergeLocaleMessages(common, menu, layout, components, pages, features)
