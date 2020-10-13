<template>
  <FixedSkeleton
    v-if="metaLoaded"
    :main-widget="mainWidget"
    :left-widgets="leftWidgets"
    :right-widgets="rightWidgets"
  />
  <LoaderBall v-else />
</template>

<script>
  import FixedSkeleton from '@scaife-viewer/skeleton';

  import {
    MODULE_NS,
    FETCH_METADATA,
    FETCH_LIBRARY,
  } from '@scaife-viewer/store';
  import { LoaderBall } from '@scaife-viewer/common';

  import ReaderWidget from '@scaife-viewer/widget-reader';
  import MetadataWidget from '@scaife-viewer/widget-metadata';
  import PassageReferenceWidget from '@scaife-viewer/widget-passage-reference';
  import PassageAncestorsWidget from '@scaife-viewer/widget-passage-ancestors';
  import PassageSiblingsWidget from '@scaife-viewer/widget-passage-siblings';
  import PassageChildrenWidget from '@scaife-viewer/widget-passage-children';
  import LibraryWidget from '@scaife-viewer/widget-library';
  import TokenAnnotationWidget from '@scaife-viewer/widget-token-annotations';
  import NamedEntitiesWidget from '@scaife-viewer/widget-named-entities';
  import DisplayModeWidget from '@scaife-viewer/widget-display-mode';
  import ScholiaWidget from '@scaife-viewer/widget-scholia';
  import AudioWidget from '@scaife-viewer/widget-audio';
  import WordListWidget from '@scaife-viewer/widget-word-list';
  import NewAlexandriaWidget from '@scaife-viewer/widget-new-alexandria';
  import TextSizeWidget from '@scaife-viewer/widget-text-size';
  import TextWidthWidget from '@scaife-viewer/widget-text-width';
  // import TOCWidget from '@scaife-viewer/widget-toc';

  export default {
    name: 'ReaderView',
    components: { FixedSkeleton, LoaderBall },
    beforeCreate() {
      if (!this.$route.query.urn) {
        // load the first version returned from ATLAS
        this.$store.dispatch(`${MODULE_NS}/${FETCH_METADATA}`);
      }
      this.$store.dispatch(`${MODULE_NS}/${FETCH_LIBRARY}`);
    },
    computed: {
      metaLoaded() {
        return this.$store.state[MODULE_NS].libraryTree !== null;
        // && this.$store.state[MODULE_NS].metadata !== null;
      },
      mainWidget() {
        return ReaderWidget;
      },
      leftWidgets() {
        return [
          LibraryWidget,
          PassageReferenceWidget,
          PassageAncestorsWidget,
          PassageSiblingsWidget,
          PassageChildrenWidget,
          // TOCWidget,  - Requires the endpoints plugin to work
        ];
      },
      rightWidgets() {
        return [
          MetadataWidget,
          TextSizeWidget,
          TextWidthWidget,
          AudioWidget,
          DisplayModeWidget,
          NamedEntitiesWidget,
          TokenAnnotationWidget,
          WordListWidget,
          NewAlexandriaWidget,
          ScholiaWidget,
        ];
      },
    },
  };
</script>
