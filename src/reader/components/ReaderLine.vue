<template>
  <div>
    <section class="tokens" v-if="interlinear">
      <span
        class="token"
        v-for="(token, index) in tokens"
        :key="`${index}-${token.value}`"
      >
        <div class="ref">{{ token.uuid }}</div>
        <div class="text">{{ token.value }}</div>
        <div class="lemma">{{ token.lemma || '-' }}</div>
        <div class="pos">{{ token.partOfSpeech || '-' }}</div>
        <div class="analysis">{{ token.tag || '-' }}</div>
        <!-- <div class="gloss">of the</div> -->
      </span>
    </section>
    <div class="line u-flex" v-else>
      <div class="line-ref">{{ line.ref }}</div>
      <div class="line-text" v-html="line.textContent"></div>
    </div>
  </div>
</template>
<script>
  export default {
    props: ['line'],
    computed: {
      interlinear() {
        // TODO: Proper toggle
        return (
          this.$route.query.interlinear && this.$route.query.interlinear === 'y'
        );
      },
      tokens() {
        return this.line.tokens.edges.map(edge => {
          const token = edge.node;
          return {
            idx: token.idx,
            uuid: token.uuid,
            value: token.value,
            lemma: token.lemma,
            partOfSpeech: token.partOfSpeech,
            tag: token.tag,
          };
        });
      },
    },
  };
</script>
<style lang="scss" scoped>
  .line {
    display: flex;
    align-items: baseline;
    .line-ref {
      font-size: 10pt;
      color: #69c;
      font-family: 'Noto Sans';
      min-width: 4em;
      margin-left: 1em;
      text-align: right;
    }
    .line-text {
      margin-left: 1em;
    }
  }
  // TODO: Clean up temporary styles
  .tokens {
    margin: 20px 0;
  }
  .tokens .token {
    display: inline-block;
    padding: 2px 4px;
    margin: 0 4px 10px;
  }
  .token .ref {
    font-family: 'Lucida Console', Monaco, monospace;
    font-size: 10px;
    color: #999;
  }
  .token .text {
    font-size: 18px;
    font-weight: 700;
    color: #000;
  }
  .token .lemma {
    font-size: 16px;
    color: #333;
  }
  .token .pos {
    font-size: 14px;
    color: #999;
  }
  .token .analysis {
    font-family: 'Lucida Console', Monaco, monospace;
    font-size: 12px;
    color: #999;
  }
  .token .gloss {
    font-size: 16px;
    color: #333;
    font-style: italic;
  }
</style>
