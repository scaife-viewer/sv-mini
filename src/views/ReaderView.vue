<template>
  <FixedSkeleton
    :main-widget="mainWidget"
    :left-widgets="leftWidgets"
    :right-widgets="rightWidgets"
  />
</template>

<script>
  import {
    MODULE_NS,
    FETCH_METADATA,
    FETCH_LIBRARY,
  } from '@scaife-viewer/store';

  import LibraryWidget from '@scaife-viewer/widget-library';
  import MetadataWidget from '@scaife-viewer/widget-metadata';
  import NewAlexandriaWidget from '@scaife-viewer/widget-new-alexandria';
  import PassageAncestorsWidget from '@scaife-viewer/widget-passage-ancestors';
  import PassageChildrenWidget from '@scaife-viewer/widget-passage-children';
  import PassageReferenceWidget from '@scaife-viewer/widget-passage-reference';
  import TextSizeWidget from '@scaife-viewer/widget-text-size';
  import TextWidthWidget from '@scaife-viewer/widget-text-width';
  import WordListWidget from '@scaife-viewer/widget-word-list';
  import ReaderWidget from '@scaife-viewer/widget-reader';
  // import TOCWidget from '@scaife-viewer/widget-toc';

  export default {
    name: 'ReaderView',
    beforeCreate() {
      if (!this.$route.query.urn) {
        // load the first version returned from ATLAS
        this.$store.dispatch(`${MODULE_NS}/${FETCH_METADATA}`);
      }
      this.$store.dispatch(`${MODULE_NS}/${FETCH_LIBRARY}`);
    },
    computed: {
      mainWidget() {
        return ReaderWidget;
      },
      leftWidgets() {
        return [
          PassageReferenceWidget,
          LibraryWidget,
          PassageAncestorsWidget,
          PassageChildrenWidget,
          // TOCWidget,  - Requires the endpoints plugin to work
        ];
      },
      rightWidgets() {
        return [
          MetadataWidget,
          TextSizeWidget,
          TextWidthWidget,
          WordListWidget,
          NewAlexandriaWidget,
        ];
      },
    },
  };
</script>
