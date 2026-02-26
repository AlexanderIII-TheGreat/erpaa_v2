/**
 * Push Notification Service for ERPAA
 * Manages browser push notifications with cross-browser support
 * Compatible with Chrome, Edge, Firefox, Safari, and other modern browsers
 */

class PushNotificationService {
    constructor() {
        this.permission = 'default';
        this.isInitialized = false;
        this.notifications = [];
        this.testIntervalId = null;
        this.appName = 'ERPAA';  // Custom app name
        this.appIcon = '/src/erpaa-notification-icon.svg';  // Custom SVG icon

        // Wait for DOM to be ready before initializing (CRITICAL for Edge compatibility)
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.delayedInit();
            });
        } else {
            // DOM already loaded
            this.delayedInit();
        }
    }

    /**
     * Delayed initialization to ensure DOM is ready (fixes Edge timing issues)
     */
    delayedInit() {
        if (this.isSupported()) {
            // Small delay to ensure all resources loaded properly (especially for Edge)
            setTimeout(() => {
                console.log('🚀 Initializing ERPAA Push Notification Service...');
                this.init();
            }, 800);  // 800ms delay helps Edge process everything properly
        } else {
            console.warn('⚠️ Push notifications are not supported in this browser');
        }
    }

    /**
     * Check if browser supports notifications
     */
    isSupported() {
        return 'Notification' in window;
    }

    /**
     * Initialize the notification service
     */
    async init() {
        if (this.isInitialized) return;

        try {
            // Check current permission status
            this.permission = Notification.permission;

            console.log(`📊 Browser: ${this.getBrowserName()}`);
            console.log(`📊 Permission status: ${this.permission}`);

            // If permission is default (not asked yet), show custom popup
            if (this.permission === 'default') {
                this.showPermissionPopup();
            }

            this.isInitialized = true;

            // Update UI status indicators if they exist
            this.updateStatusIndicators();

            // Log status
            if (this.permission === 'granted') {
                console.log('✅ ERPAA notifications ENABLED');
            } else if (this.permission === 'denied') {
                console.warn('❌ ERPAA notifications BLOCKED');
            } else {
                console.log('⏳ ERPAA notifications AWAITING permission');
            }
        } catch (error) {
            console.error('Failed to initialize ERPAA push notifications:', error);
        }
    }

    /**
     * Get browser name for debugging
     */
    getBrowserName() {
        const userAgent = navigator.userAgent;
        if (userAgent.indexOf('Edg') > -1) return 'Microsoft Edge';
        if (userAgent.indexOf('Chrome') > -1) return 'Google Chrome';
        if (userAgent.indexOf('Firefox') > -1) return 'Mozilla Firefox';
        if (userAgent.indexOf('Safari') > -1) return 'Safari';
        if (userAgent.indexOf('Opera') > -1 || userAgent.indexOf('OPR') > -1) return 'Opera';
        return 'Unknown Browser';
    }

    /**
     * Show custom permission request popup
     */
    showPermissionPopup() {
        // Check if popup already exists
        if (document.getElementById('push-permission-popup')) return;

        const popupHTML = `
            <div id="push-permission-popup" style="
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.6);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
                animation: fadeIn 0.3s ease;
            ">
                <div style="
                    background: white;
                    border-radius: 16px;
                    padding: 32px;
                    max-width: 440px;
                    width: 90%;
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                    animation: slideUp 0.3s ease;
                ">
                    <div style="text-align: center; margin-bottom: 24px;">
                        <div style="
                            width: 64px;
                            height: 64px;
                            background: linear-gradient(135deg, #4A90E2, #2A6EBB);
                            border-radius: 50%;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            margin: 0 auto 16px auto;
                            font-size: 32px;
                        ">🔔</div>
                        <h2 style="
                            font-size: 24px;
                            font-weight: 700;
                            color: #2D3748;
                            margin: 0 0 8px 0;
                        ">Aktifkan Notifikasi ERPAA</h2>
                        <p style="
                            font-size: 14px;
                            color: #718096;
                           margin: 0;
                            line-height: 1.6;
                        ">Dapatkan update real-time tentang stok, pesanan, dan aktivitas penting lainnya langsung di desktop Anda.</p>
                    </div>
                    
                    <div style="margin-bottom: 24px;">
                        <div style="display: flex; align-items: start; margin-bottom: 12px;">
                            <div style="
                                width: 32px;
                                height: 32px;
                                background: #E6FFFA;
                                border-radius: 8px;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                margin-right: 12px;
                                flex-shrink: 0;
                            ">⚡</div>
                            <div>
                                <div style="font-weight: 600; color: #2D3748; font-size: 14px; margin-bottom: 2px;">Notifikasi Real-Time</div>
                                <div style="font-size: 13px; color: #718096;">Terima alert instant untuk stok kritis dan status pesanan</div>
                            </div>
                        </div>
                        <div style="display: flex; align-items: start; margin-bottom: 12px;">
                            <div style="
                                width: 32px;
                                height: 32px;
                                background: #EBF8FF;
                                border-radius: 8px;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                margin-right: 12px;
                                flex-shrink: 0;
                            ">🔒</div>
                            <div>
                                <div style="font-weight: 600; color: #2D3748; font-size: 14px; margin-bottom: 2px;">Aman & Terkontrol</div>
                                <div style="font-size: 13px; color: #718096;">Anda dapat menonaktifkan kapan saja dari pengaturan browser</div>
                            </div>
                        </div>
                    </div>
                    
                    <div style="display: flex; gap: 12px;">
                        <button id="push-permission-allow" style="
                            flex: 1;
                            background: linear-gradient(135deg, #4A90E2, #2A6EBB);
                            color: white;
                            border: none;
                            border-radius: 10px;
                            padding: 14px 24px;
                            font-size: 15px;
                            font-weight: 600;
                            cursor: pointer;
                            transition: all 0.3s;
                            box-shadow: 0 4px 12px rgba(74, 144, 226, 0.3);
                        " onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 16px rgba(74, 144, 226, 0.4)'" 
                           onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 12px rgba(74, 144, 226, 0.3)'">
                            Aktifkan Notifikasi
                        </button>
                        <button id="push-permission-deny" style="
                            flex: 0.4;
                            background: #F7FAFC;
                            color: #718096;
                            border: 1px solid #E2E8F0;
                            border-radius: 10px;
                            padding: 14px 16px;
                            font-size: 15px;
                            font-weight: 600;
                            cursor: pointer;
                            transition: all 0.3s;
                        " onmouseover="this.style.background='#EDF2F7'" 
                           onmouseout="this.style.background='#F7FAFC'">
                            Nanti
                        </button>
                    </div>
                </div>
            </div>
            <style>
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes slideUp {
                    from { transform: translateY(20px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
            </style>
        `;

        // Insert popup into body
        document.body.insertAdjacentHTML('beforeend', popupHTML);

        // Add event listeners
        const allowBtn = document.getElementById('push-permission-allow');
        const denyBtn = document.getElementById('push-permission-deny');

        if (allowBtn) {
            allowBtn.addEventListener('click', async () => {
                console.log('User clicked: Allow notifications');
                await this.requestPermission();
                this.removePermissionPopup();
            });
        }

        if (denyBtn) {
            denyBtn.addEventListener('click', () => {
                console.log('User clicked: Not now');
                this.removePermissionPopup();
            });
        }
    }

    /**
     * Remove permission popup from DOM
     */
    removePermissionPopup() {
        const popup = document.getElementById('push-permission-popup');
        if (popup) {
            popup.style.opacity = '0';
            setTimeout(() => popup.remove(), 300);
        }
    }

    /**
     * Request notification permission from user
     */
    async requestPermission() {
        if (!this.isSupported()) {
            console.warn('Notifications not supported');
            return 'denied';
        }

        try {
            console.log('Requesting notification permission...');
            const permission = await Notification.requestPermission();
            this.permission = permission;

            if (permission === 'granted') {
                console.log('✅ Notification permission GRANTED');
            } else if (permission === 'denied') {
                console.warn('❌ Notification permission DENIED');
            }

            // Update UI status indicators
            this.updateStatusIndicators();

            return permission;
        } catch (error) {
            console.error('Error requesting notification permission:', error);
            return 'denied';
        }
    }

    /**
     * Update UI status indicators
     */
    updateStatusIndicators() {
        if (typeof window !== 'undefined') {
            const event = new CustomEvent('pushNotificationStatusChange', {
                detail: {
                    permission: this.permission,
                    isEnabled: this.permission === 'granted',
                    isBlocked: this.permission === 'denied',
                    isPending: this.permission === 'default',
                    appName: this.appName
                }
            });
            window.dispatchEvent(event);
        }
    }

    /**
     * Show a browser notification with ERPAA branding
     */
    showNotification(title, options = {}) {
        if (!this.isSupported()) {
            console.warn('Notifications not supported');
            return null;
        }

        if (this.permission !== 'granted') {
            console.warn('Notification permission not granted. Current status:', this.permission);
            return null;
        }

        try {
            // Default ERPAA branding
            const defaultOptions = {
                icon: this.appIcon,
                badge: this.appIcon,
                tag: 'erpaa-notification',
                vibrate: [200, 100, 200],
                requireInteraction: false,
                silent: false,
                // Add ERPAA branding to body
                body: options.body || '',
                data: {
                    app: this.appName,
                    timestamp: Date.now()
                }
            };

            // Merge options
            const notificationOptions = { ...defaultOptions, ...options };

            // Create notification with ERPAA prefix
            const notificationTitle = `${this.appName} - ${title}`;
            const notification = new Notification(notificationTitle, notificationOptions);

            // Store notification reference
            this.notifications.push(notification);

            // Auto-close after 10 seconds
            setTimeout(() => {
                notification.close();
            }, 10000);

            // Handle notification click
            notification.onclick = (event) => {
                event.preventDefault();
                window.focus();
                notification.close();

                if (options.onClick && typeof options.onClick === 'function') {
                    options.onClick(event);
                }
            };

            // Handle notification close
            notification.onclose = () => {
                const index = this.notifications.indexOf(notification);
                if (index > -1) {
                    this.notifications.splice(index, 1);
                }
            };

            // Handle notification error
            notification.onerror = (error) => {
                console.error('Notification error:', error);
            };

            console.log('📢 ERPAA notification shown:', title);
            return notification;
        } catch (error) {
            console.error('Error showing notification:', error);
            return null;
        }
    }

    /**
     * Show typed notification with ERPAA branding
     */
    showTypedNotification(type, title, body, extraOptions = {}) {
        const typeConfig = {
            critical: {
                icon: this.appIcon,
                tag: 'erpaa-critical',
                requireInteraction: true
            },
            warning: {
                icon: this.appIcon,
                tag: 'erpaa-warning',
                requireInteraction: false
            },
            info: {
                icon: this.appIcon,
                tag: 'erpaa-info',
                requireInteraction: false
            },
            success: {
                icon: this.appIcon,
                tag: 'erpaa-success',
                requireInteraction: false
            }
        };

        const config = typeConfig[type] || typeConfig.info;

        const options = {
            body: body,
            icon: config.icon,
            badge: config.icon,
            tag: config.tag,
            requireInteraction: config.requireInteraction,
            ...extraOptions
        };

        return this.showNotification(title, options);
    }

    /**
     * Start demo mode - show test notifications every 20 seconds
     */
    startDemoMode() {
        if (this.testIntervalId) {
            console.warn('Demo mode already running');
            return;
        }

        console.log('🚀 Starting ERPAA demo mode - notifications every 20 seconds');

        const demoNotifications = [
            {
                type: 'critical',
                title: 'Stok Kritis!',
                body: 'Kaos Premium Cotton tersisa 5 unit. Segera lakukan restok.'
            },
            {
                type: 'warning',
                title: 'Stok Menipis',
                body: 'Wireless Headphone Pro tersisa 8 unit.'
            },
            {
                type: 'info',
                title: 'Update Sistem',
                body: 'Sinkronisasi dengan Tokopedia berhasil dilakukan.'
            },
            {
                type: 'success',
                title: 'Restok Berhasil',
                body: 'Essential Oil Set berhasil ditambahkan 50 unit.'
            },
            {
                type: 'warning',
                title: 'Smartwatch Series 5',
                body: 'Prediksi habis dalam 2 minggu. Persiapkan restok.'
            },
            {
                type: 'info',
                title: 'Laporan Harian',
                body: 'Total penjualan hari ini: Rp 15.750.000'
            }
        ];

        let notificationIndex = 0;

        // Show first notification immediately
        const firstNotif = demoNotifications[0];
        this.showTypedNotification(
            firstNotif.type,
            firstNotif.title,
            firstNotif.body
        );
        notificationIndex = 1;

        // Then show every 20 seconds
        this.testIntervalId = setInterval(() => {
            const notif = demoNotifications[notificationIndex % demoNotifications.length];
            this.showTypedNotification(
                notif.type,
                notif.title,
                notif.body
            );
            notificationIndex++;
        }, 20000); // 20 seconds

        console.log('✅ ERPAA demo mode started');
    }

    /**
     * Stop demo mode
     */
    stopDemoMode() {
        if (this.testIntervalId) {
            clearInterval(this.testIntervalId);
            this.testIntervalId = null;
            console.log('⏹️ ERPAA demo mode stopped');
        }
    }

    /**
     * Check current permission status
     */
    checkPermission() {
        if (!this.isSupported()) {
            return 'not-supported';
        }
        return Notification.permission;
    }

    /**
     * Close all active notifications
     */
    closeAll() {
        this.notifications.forEach(notification => {
            try {
                notification.close();
            } catch (error) {
                console.error('Error closing notification:', error);
            }
        });
        this.notifications = [];
    }
}

// Create and export singleton instance
const pushNotificationService = new PushNotificationService();

// Export for use in other scripts
if (typeof window !== 'undefined') {
    window.PushNotificationService = pushNotificationService;
}
