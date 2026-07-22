module.exports = async function (context, req) {
    context.res = {
        headers: { 'Content-Type': 'application/json' },
        body: {
            speechKey: process.env.AZURE_SPEECH_KEY ?? '',
            speechRegion: process.env.AZURE_SPEECH_REGION ?? '',
            openAIEndpoint: process.env.AZURE_OPENAI_ENDPOINT ?? '',
            openAIKey: process.env.AZURE_OPENAI_KEY ?? '',
            openAIDeployment: process.env.AZURE_OPENAI_DEPLOYMENT ?? ''
        }
    };
};
