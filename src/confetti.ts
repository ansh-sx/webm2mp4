import JSConfetti from 'js-confetti'

export const jsConfetti = new JSConfetti()

export const showConfetti = () => {
    const confettiColors = ['#9b5de5', '#f15bb5', '#fee440', '#00bbf9', '#00f5d4'];
    jsConfetti.addConfetti({
        confettiColors: confettiColors,
    }).then(() => console.log('🎉 Confetti Complete'));
};

