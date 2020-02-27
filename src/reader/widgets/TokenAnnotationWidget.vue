<template>
  <div class="selected-tokens">
    <div class="selected-token" v-for="token in tokens" :key="token['uuid']">
      <pre>{{ prettyPrint(token) }}</pre>
    </div>
  </div>
</template>
<script>
  import gql from 'graphql-tag';
  import { URN } from '@scaife-viewer/scaife-widgets';
  import { MODULE_NS } from '@/reader/constants';

  export default {
    scaifeConfig: {
      displayName: 'Token Annotations',
      location: 'main',
      singleton: true,
    },
    methods: {
      prettyPrint(token) {
        return JSON.stringify(token, null, 2);
      },
    },
    computed: {
      // TODO: Dedupe from Reader.vue
      urn() {
        return this.$route.query.urn
          ? new URN(this.$route.query.urn)
          : this.$store.getters[`${MODULE_NS}/firstPassageUrn`];
      },
      // TODO: Dedupe from Reader.vue
      gqlQuery() {
        if (this.urn) {
          return gql`
            {
              passageTextParts(reference: "${this.urn.absolute}", first: 1) {
              metadata
              edges {
                node {
                  id
                  kind
                  urn
                  ref
                  textContent
                  tokens {
                    edges {
                      node {
                        idx
                        uuid
                        value
                        lemma
                        partOfSpeech
                        case
                        mood
                        tag
                      }
                    }
                  }
                }
              }
            }
          }
          `;
        }
        return null;
      },
      // TODO: Dedupe from Reader.vue
      lines() {
        return this.gqlData
          ? this.gqlData.passageTextParts.edges.map(line => line.node)
          : [];
      },
      tokens() {
        if (this.lines.length > 0) {
          return this.lines[0].tokens.edges.map(edge => {
            const token = edge.node;
            return {
              idx: token.idx,
              uuid: token.uuid,
              value: token.value,
              lemma: token.lemma,
              partOfSpeech: token.partOfSpeech,
              case: token.case,
              mood: token.mood,
              tag: token.tag,
            };
          });
        }
        return [];
      },
    },
  };
</script>
<style lang="scss" scoped>
  .selected-tokens {
    width: 100%;
    margin: 0 2em;
  }
</style>
