import Skeleton from './skeleton.vue'
import SkeletonAvatar from './skeleton-avatar.vue'
import SkeletonParagraph from './skeleton-paragraph.vue'
import SkeletonTitle from './skeleton-title.vue'

export type SkeletonInstance = InstanceType<typeof Skeleton>
export * from './props'

export default Skeleton

export { SkeletonAvatar, SkeletonParagraph, SkeletonTitle }
